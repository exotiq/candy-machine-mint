import { Paper } from "@material-ui/core";

const styles = {
    root: {
        backgroundColor: "transparent",
        backgroundImage: "url(/assets/images/exotiq-transparent.png)",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "block",
        height: "400px"
    }
};

const Home = () => {
    return (
        <Paper style={styles.root}/>
    );
};

export default Home;
