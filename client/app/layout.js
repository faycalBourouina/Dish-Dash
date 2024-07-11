import { Grid, Box } from '@mui/material'
import { AuthProvider, ActiveTabProvider, LandingRecipesProvider, FavoriteRecipesProvider, SelectedRecipeProvider, SearchProvider, FavoriteMessageProvider  } from './contexts'
import { FavoriteMessageBar, Navbar, DemoMessage, SearchForm, Footer } from './components'


export const metadata = {
    title: 'Dish-Dash',
    description: 'Get recipes'
}

const RootLayout = ({ children }) => {

    return (
       <html>
            <body>
                <Grid container direction="column">

                    <Grid item xs={12}>
                            <FavoriteMessageProvider>
                                <FavoriteMessageBar />
                            </FavoriteMessageProvider>

                        <Box pl={8} pr={8} pt={4} pb={0}>
                            <AuthProvider initialIsLogged ={false}>
                                <ActiveTabProvider>
                                    <SelectedRecipeProvider>
                                        <Navbar />
                                    </SelectedRecipeProvider>
                                </ActiveTabProvider>
                            </ AuthProvider>
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
                            <AuthProvider initialIsLogged ={false}>
                                <ActiveTabProvider>
                                    <LandingRecipesProvider>
                                        <FavoriteRecipesProvider>
                                            <SelectedRecipeProvider>
                                                <SearchProvider>
                                                    <FavoriteMessageProvider>
                                                        { children }
                                                    </FavoriteMessageProvider>
                                                </SearchProvider>
                                            </SelectedRecipeProvider>
                                        </FavoriteRecipesProvider>
                                    </LandingRecipesProvider>
                                </ActiveTabProvider>
                            </AuthProvider>
                        </Grid>

                    </Box>

                        <Footer />
                    
                </Grid>
            </body>
       </html>
    )
}
export default RootLayout;