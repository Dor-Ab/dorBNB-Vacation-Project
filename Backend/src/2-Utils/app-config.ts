class AppConfig {
    // Database
    public host = "localhost" // Computer name/ address of our database
    public user = "root" // Database user
    public password = "" // Database password
    public database = "dorBNB" // Database name

    // Server Port
    public port = 3001

    // Frontend URL
    public frontEndUrl = "http://localhost:3000"
}

const appConfig = new AppConfig()

export default appConfig