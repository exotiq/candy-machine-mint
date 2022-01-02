import { createTheme, ThemeProvider } from "@material-ui/core";
import * as anchor from "@project-serum/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import {
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletWallet,
    getSolletExtensionWallet
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

import { Default } from "./themes/Default"
import Mint from "./components/Mint";
import Team from "./components/Team";
import Home from "./components/Home";

const treasury = new anchor.web3.PublicKey(process.env.REACT_APP_TREASURY_ADDRESS!);
const config = new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_CONFIG!);
const candyMachineId = new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID!);
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);
const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

// https://bareynol.github.io/mui-theme-creator/
const theme = createTheme(Default);

const App = () => {
    const endpoint = useMemo(() => clusterApiUrl(network), []);
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            getSlopeWallet(),
            getSolflareWallet(),
            getSolletWallet({ network }),
            getSolletExtensionWallet({ network })
        ],
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <Home/>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect={true}>
                    <WalletDialogProvider>
                        <Mint
                            candyMachineId={candyMachineId}
                            config={config}
                            connection={connection}
                            startDate={startDateSeed}
                            treasury={treasury}
                            txTimeout={txTimeout}
                        />
                    </WalletDialogProvider>
                </WalletProvider>
            </ConnectionProvider>
            <Team/>
        </ThemeProvider>
    );
};

export default App;
