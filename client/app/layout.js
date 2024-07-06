
export const metadata = {
    title: 'Dish-Dash',
    description: 'Get recipes'
}

const RootLayout = ({ children }) => {
    return (
       <html>
            <body>
                <div>
                    Layout here in html file
                    { children }
                </div>
            </body>
       </html>
    )
}
export default RootLayout;