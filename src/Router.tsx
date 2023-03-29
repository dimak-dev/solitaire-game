import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, {useState, lazy, Suspense, useMemo} from 'react';
import {createHashRouter, RouterProvider} from "react-router-dom";

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
                    </Box>
                </Toolbar>
            </AppBar>
            <RouterProvider router={router}/>
        </div>
    )
}