import { Grid, Box } from '@mui/material'
import { ActiveTabProvider, LandingRecipesProvider, FavoriteRecipesProvider, SelectedRecipeProvider,  } from './contexts'
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
                            <FavoriteMessageBar />
                        <Box pl={8} pr={8} pt={4} pb={0}>
                            <ActiveTabProvider>
                                <Navbar />
                            </ActiveTabProvider>
                        </Box>
                        
                        <Box pt={4}>
                            <DemoMessage />
                        </Box>
                    </Grid>
                    
                    <Box p={8}>
                        <Grid item xs={12}>
                            <SearchForm onSearch={handleSearch} />
                        </Grid>

                        <Grid item xs={12} p={12}>
                            <ActiveTabProvider>
                                <LandingRecipesProvider>
                                    <FavoriteRecipesProvider>
                                        <SelectedRecipeProvider>
                                            <SearchProvider>
                                                { children }
                                            </SearchProvider>
                                        </SelectedRecipeProvider>
                                    </FavoriteRecipesProvider>
                                </LandingRecipesProvider>
                            </ActiveTabProvider>
                        </Grid>

                    </Box>

                        <Footer />
                    
                </Grid>
            </body>
       </html>
    )
}
export default RootLayout;