import { Grid, Box } from '@mui/material'
import { AuthProvider, ActiveTabProvider, LandingRecipesProvider, FavoriteRecipesProvider, SelectedRecipeProvider, SearchProvider, FavoriteMessageProvider  } from './contexts'
import { FavoriteMessageBar, Navbar, DemoMessage, SearchForm, Footer } from './components'

export const metadata = {
    title: 'Dish-Dash',
    description: 'Get recipes',
    stylesheets: [
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
          },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
        }
    ]
}

const RootLayout = ({ children }) => {
    return (
       <html>
            <body>
                <Grid container direction="column">
                    <AuthProvider >
                        <ActiveTabProvider>
                            <LandingRecipesProvider>
                                <FavoriteRecipesProvider>
                                            <SelectedRecipeProvider>
                                                <SearchProvider>
                                                    <FavoriteMessageProvider>
                                                        <Grid item xs={12}>
                                                            <Box pl={8} pr={8} pb={0}>
                                                                <FavoriteMessageBar />
                                                            </Box>
                                                            <Box pl={8} pr={8} pt={4} pb={0}>
                                                                <Navbar />
                                                            </Box>
                                                            <Box pt={4}>
                                                                <DemoMessage />
                                                            </Box>
                                                        </Grid>
                                                        <Box p={8}>
                                                            <Grid item xs={12}>
                                                                <SearchForm />
                                                            </Grid>
                                                            <Grid item xs={12} p={12}>
                                                                { children }
                                                            </Grid>
                                                        </Box>
                                                        <Footer />
                                                    </FavoriteMessageProvider>
                                                </SearchProvider>
                                            </SelectedRecipeProvider>
                                    </FavoriteRecipesProvider>
                            </LandingRecipesProvider>
                        </ActiveTabProvider>
                    </AuthProvider>                    
                </Grid>
            </body>
       </html>
    )
}
export default RootLayout;