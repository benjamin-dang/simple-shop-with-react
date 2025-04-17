import { AppBar, Toolbar, Typography, Box, Grid, TextField, InputBase, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useLocation } from "react-router";

const menueItems = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Searchbar',
    },

    {
        name: 'Products',
        href: '/products'
    },
    {
        name: 'Cart',
        href: '/cart'
    },
]


const Search = styled('div')(({ theme }) => ({
    flexGrow: 5,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Header = () => {

    const location = useLocation();

    return (
        <AppBar position="sticky" sx={{ borderRadius: 50 }} >
            <Toolbar>
                <Typography variant="h5" component='div' sx={{ flexGrow: 0, mr: 2 }}>
                    Simple Shop
                </Typography>
                {menueItems.map((item, index) => {

                    return (
                        (
                            item.name == 'Searchbar' ?
                                <Search key={index}>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                                : location.pathname === item.href ?
                                    <NavLink to={item.href} key={index} style={{ color: 'white' }}>
                                        <Button color="inherit" sx={{ mx: 1 }} key={index}>
                                            <Typography key={index} sx={{ flexGrow: 1, fontWeight: 'bold' }} variant="h6">{item.name}</Typography>
                                        </Button>
                                    </NavLink>
                                    :
                                    <NavLink to={item.href} key={index}>
                                        <Button color="inherit" sx={{ mx: 1 }} href={item.href} key={index}>
                                            <Typography key={index} sx={{ flexGrow: 1, color: 'lightgrey' }} variant="h6">{item.name}</Typography>
                                        </Button>
                                    </NavLink>
                        )
                    )
                })}
            </Toolbar>
        </AppBar>
    )
}

export { Header };