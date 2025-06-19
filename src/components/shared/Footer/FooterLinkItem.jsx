import { Link } from '@mui/material';

const FooterLinkItem = ({ children, href, target, rel, sx = {} }) => (
    <li style={{ marginBottom: '8px' }}>
        <Link 
            href={href} 
            target={target}
            rel={rel}
            variant="body2" 
            color="#b8b8b8" 
            sx={{
                '&:hover': { color: 'white', textDecoration: 'underline' },
                textDecoration: 'none',
                ...sx
            }}
        >
            {children}
        </Link>
    </li>
);

export default FooterLinkItem;