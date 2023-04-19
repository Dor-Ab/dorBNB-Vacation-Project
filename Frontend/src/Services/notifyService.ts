import { Notyf } from "notyf"

class NotifyService {

    private notification = new Notyf({ duration: 4000, position: { x: "right", y: "bottom" }, })

    public success(msg: string): void {
        this.notification.success(msg)
    }

    public error(err: any): void {
        const message = this.extractErrMsg(err)
        this.notification.error(message)
    }

    private extractErrMsg(err: any): string {

        if (typeof err === "string") return err

        if (typeof err.response?.data === "string") return err.response.data

        if (Array.isArray(err.response?.data)) return err.response.data[0]

        if (typeof err.message === "string") return err.message

        return "Unexpected Error, Please try again."

    }
}

const notify = new NotifyService()

export default notify