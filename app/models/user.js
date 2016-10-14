module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
        username: { type: String, unique: true },
        password: String,
        city: String,
        bar: String
    })

    let User = mongoose.model('users', userSchema)

    return User;
}
