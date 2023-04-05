import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, {lazy, Suspense} from 'react';
import {createHashRouter, RouterProvider} from "react-router-dom";
import {gameBoardActions} from "Redux/game";
import {useDispatch} from "react-redux";

const LearnReact = lazy(() => import('Pages/learn-react/LearnReact'));
const Index = lazy(() => import('Pages/index/Index'));
const Examples = lazy(() => import('Pages/Examples'));
const Board = lazy(() => import('Pages/Board'));

const router = createHashRouter([
    {
        path: '/',
        element: <Suspense><Index /></Suspense>,
    },
    {
        path: '/learn-react',
        element: <Suspense><LearnReact /></Suspense>
    },
    {
        path: '/examples',
        element: <Suspense><Examples /></Suspense>
    },
    {
        path: '/board',
        element: <Suspense><Board /></Suspense>
    }
]);

export default function Router() {
    const dispatch = useDispatch();
    return (
        <div>
            <AppBar position='static'>
                <Toolbar variant='dense'>
                    <Typography variant='h6'>
                        Card Game
                    </Typography>
                    <Box>
                        <Button sx={{color: 'white'}} onClick={() => router.navigate('/')}>
                            Index
                        </Button>
                        
                        <Button sx={{color: 'white'}} onClick={() => router.navigate('/learn-react')}>
                            Learn React
                        </Button>
                        
                        <Button sx={{color: 'white'}} onClick={() => router.navigate('/examples')}>
                            Examples
                        </Button>

                        <Button sx={{color: 'white'}} onClick={() => router.navigate('/board')}>
                            Board
                        </Button>

                        <Button sx={{color: 'white'}} onClick={() => dispatch(gameBoardActions.newGame())}>
                            New Game
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <RouterProvider router={router}/>
        </div>
    )
}