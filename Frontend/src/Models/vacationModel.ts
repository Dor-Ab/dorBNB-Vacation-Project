class VacationsModel {
    public id: number
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public price: number
    public photoName: string
    public photo: FileList

    // public constructor(vacation: VacationsModel) {
    //     this.id = vacation.id
    //     this.destination = vacation.destination
    //     this.description = vacation.description
    //     this.startDate = vacation.startDate
    //     this.endDate = vacation.endDate
    //     this.price = vacation.price
    //     this.photoName = vacation.photoName
    //     this.photo = vacation.photo
    // }
}

export default VacationsModel