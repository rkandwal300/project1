import { Link } from '@mui/material';

const FooterLinkItem = ({ children }) => (

    <li style={{ marginBottom: '8px' }}>
        <Link href="#" variant="body2" color="#b8b8b8" sx={{
            '&:hover': { color: 'white', textDecoration: 'underline' },
            textDecoration: 'none'
        }}>
            {children}
        </Link>
    </li>
);
export default FooterLinkItem;