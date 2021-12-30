import { Box, Button, CircularProgress, createStyles, Grid, makeStyles, Paper, Snackbar, Theme } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import * as anchor from "@project-serum/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import styled from "styled-components";
import {
    CandyMachine,
    awaitTransactionSignatureConfirmation,
    getCandyMachineState,
    mintOneToken,
    shortenAddress
} from "../candy-machine";
import "./Mint.scss";

const CounterText = styled.span``; // add your styles here
const MintButton = styled(Button)``; // add your styles here

export interface HomeProps {
    candyMachineId: anchor.web3.PublicKey;
    config: anchor.web3.PublicKey;
    connection: anchor.web3.Connection;
    startDate: number;
    treasury: anchor.web3.PublicKey;
    txTimeout: number;
}

const Mint = (props: HomeProps) => {
    const [ balance, setBalance ] = useState<number>();
    const [ isActive, setIsActive ] = useState(false); // true when countdown completes
    const [ isSoldOut, setIsSoldOut ] = useState(false); // true when items remaining is zero
    const [ isMinting, setIsMinting ] = useState(false); // true when user got to press MINT

    const [ itemsAvailable, setItemsAvailable ] = useState(0);
    const [ itemsRedeemed, setItemsRedeemed ] = useState(0);
    const [ itemsRemaining, setItemsRemaining ] = useState(0);

    const [ alertState, setAlertState ] = useState<AlertState>({
        open: false,
        message: "",
        severity: undefined
    });

    const [ startDate, setStartDate ] = useState(new Date(props.startDate));

    const wallet = useAnchorWallet();
    const [ candyMachine, setCandyMachine ] = useState<CandyMachine>();

    const refreshCandyMachineState = () => {
        (async () => {
            if (!wallet) return;

            const {
                candyMachine,
                goLiveDate,
                itemsAvailable,
                itemsRemaining,
                itemsRedeemed
            } = await getCandyMachineState(
                wallet as anchor.Wallet,
                props.candyMachineId,
                props.connection
            );

            setItemsAvailable(itemsAvailable);
            setItemsRemaining(itemsRemaining);
            setItemsRedeemed(itemsRedeemed);

            setIsSoldOut(itemsRemaining === 0);
            setStartDate(goLiveDate);
            setCandyMachine(candyMachine);
        })();
    };

    const onMint = async () => {
        try {
            setIsMinting(true);
            if (wallet && candyMachine?.program) {
                const mintTxId = await mintOneToken(
                    candyMachine,
                    props.config,
                    wallet.publicKey,
                    props.treasury
                );

                const status = await awaitTransactionSignatureConfirmation(
                    mintTxId,
                    props.txTimeout,
                    props.connection,
                    "singleGossip",
                    false
                );

                if (!status?.err) {
                    setAlertState({
                        open: true,
                        message: "Congratulations! Mint succeeded!",
                        severity: "success"
                    });
                } else {
                    setAlertState({
                        open: true,
                        message: "Mint failed! Please try again!",
                        severity: "error"
                    });
                }
            }
        } catch (error: any) {
            // TODO: blech:
            let message = error.msg || "Minting failed! Please try again!";
            if (!error.msg) {
                if (error.message.indexOf("0x138")) {
                } else if (error.message.indexOf("0x137")) {
                    message = `SOLD OUT!`;
                } else if (error.message.indexOf("0x135")) {
                    message = `Insufficient funds to mint. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    message = `SOLD OUT!`;
                    setIsSoldOut(true);
                } else if (error.code === 312) {
                    message = `Minting period hasn't started yet.`;
                }
            }

            setAlertState({
                open: true,
                message,
                severity: "error"
            });
        } finally {
            if (wallet) {
                const balance = await props.connection.getBalance(wallet.publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            }
            setIsMinting(false);
            refreshCandyMachineState();
        }
    };

    useEffect(() => {
        (async () => {
            if (wallet) {
                const balance = await props.connection.getBalance(wallet.publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            }
        })();
    }, [ wallet, props.connection ]);

    useEffect(refreshCandyMachineState, [
        wallet,
        props.candyMachineId,
        props.connection
    ]);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            paper: {
                color: "#0EA5E9",
                backgroundColor: "transparent",
                padding: theme.spacing(2),
                textAlign: 'center',
            },
        }),
    );

    const classes = useStyles();

    return (
        <div className="mint-container p-x-5 p-y-10">
            {/*
                { wallet && (
                    <p>Wallet {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
                )}
                {wallet && <p>Deine Wallet Balance: {(balance || 0).toLocaleString()} SOL</p>}
                {wallet && <p>Total verfügbare NFTs: {itemsAvailable}</p>}
                {wallet && <p>Bezogene NFTs: {itemsRedeemed}</p>}
                {wallet && <p>Verfügbare NFTs: {itemsRemaining}</p>}
                */
            }
            <div className="w-100 text-center">
                {!wallet ? (
                    <WalletDialogButton variant="text" color="default" fullWidth size="large">Connect your wallet</WalletDialogButton>
                ) : (
                    <div className="flex flex-col">
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}  elevation={0}>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box component="span" sx={{ color: "#FFFFFF", fontSize: 16, mt: 1 }}>Wallet</Box>
                                        <Box component="span" sx={{ color: "primary.main", fontSize: 22 }}>{shortenAddress(wallet.publicKey.toBase58() || "")}</Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}  elevation={0}>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box component="span" sx={{ color: "#FFFFFF", fontSize: 16, mt: 1 }}>Balance</Box>
                                        <Box component="span" sx={{ color: "primary.main", fontSize: 22 }}>{(balance || 0).toLocaleString()} SOL</Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}  elevation={0}>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Box component="span" sx={{ color: "#FFFFFF", fontSize: 16, mt: 1 }}>Tokens</Box>
                                        <Box component="span" sx={{ color: "primary.main", fontSize: 22 }}>{itemsRemaining}/{itemsAvailable}</Box>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        <Button
                                            variant="text" color="default" fullWidth size="large"
                                            disabled={isSoldOut || isMinting || !isActive}
                                            onClick={onMint}>
                                            {isSoldOut ?
                                                ("SOLD OUT") : isActive ?
                                                    (isMinting ? (<CircularProgress/>) : ("MINT"))
                                                    : (
                                                        <Countdown
                                                            date={startDate}
                                                            onMount={({ completed }) => completed && setIsActive(true)}
                                                            onComplete={() => setIsActive(true)}
                                                            renderer={renderCounter}
                                                        />
                                                    )}
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>

            <Snackbar
                open={alertState.open}
                autoHideDuration={6000}
                onClose={() => setAlertState({ ...alertState, open: false })}
            >
                <Alert
                    onClose={() => setAlertState({ ...alertState, open: false })}
                    severity={alertState.severity}
                >
                    {alertState.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

interface AlertState {
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
    return (
        <CounterText>
            {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
        </CounterText>
    );
};

export default Mint;
