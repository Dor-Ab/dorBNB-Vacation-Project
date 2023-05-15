class AppConfig {
    public vacationsUrl = `http://localhost:3001/api/vacations/`
    public registerUrl = `http://localhost:3001/api/auth/register/`
    public loginUrl = `http://localhost:3001/api/auth/login/`
    public vacationImagesUrl = `http://localhost:3001/api/vacations/images/`
    public followersUrl = `http://localhost:3001/api/followers/`
    public specificFollower = `http://localhost:3001/api/specific-follower/`
    public followerForVacation = `http://localhost:3001/api/followers-by-vacation/`
}

const appConfig = new AppConfig()

export default appConfig