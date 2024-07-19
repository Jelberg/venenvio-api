export class CreateProfileDto {
    userId: string
    isVerifiedEmail: boolean
    isVerifiedPhone?: boolean
}
