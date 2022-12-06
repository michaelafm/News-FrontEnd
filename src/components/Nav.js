import { Box } from 'grommet'
import { Link } from "react-router-dom";

function Nav () {
  return (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad= 'medium'
        elevation='medium'>

    <nav className="Nav">
      <Link to="/">
        <p>All articles</p>
      </Link>
    </nav>
        </Box>

  );
};

export default Nav;