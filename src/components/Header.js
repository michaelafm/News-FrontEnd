import { Heading } from "grommet";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Link to="/">
<Heading
size='large'
color='#00739D'>
  NC News
</Heading>
</Link>
  );
}

export default Header;
