class Validations {
    fullNameRegex = /^[A-Za-zÀ-ÿ]+\s+[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/
    passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    userNameRegex = /^(?=.*[A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ0-9\s]+$/
    dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

    validateFullName(fullName) {
        return this.fullNameRegex.test(fullName)
    }

    validateUserName(userName) {
        return this.userNameRegex.test(userName)
    }

    validateEmail(email) {
        return this.emailRegex.test(email)
    }

    validatePassword(password) {
        return this.passwordRegex.test(password)
    }

    validateBirthDate(birthDate) {
        if (!this.dateFormatRegex.test(birthDate)) {
            return false;
        }

        const date = new Date(birthDate);
        const today = new Date();

        if (isNaN(date.getTime()) || date >= today) {
            return false;
        }

        const [year, month, day] = birthDate.split('-').map(Number);
        const monthDays = new Date(year, month, 0).getDate();
        if (day > monthDays) {
            return false;
        }

        return true;
    }

    validateUser(user) {
        const errors = []

        if (user.nomeCompleto) {
            if (!this.validateFullName(user.nomeCompleto)) {
                errors.push("Nome completo deve conter ao menos duas palavras com apenas letras e espaços")
            }
        }

        if (user.nomeDeUsuario) {
            if (!this.validateUserName(user.nomeDeUsuario)) {
                errors.push("Nome de usuário deve conter apenas letras, números e espaços")
            }
        }

        if (user.email) {
            if (!this.validateEmail(user.email)) {
                errors.push("Formato de email inválido")
            }
        }

        if (user.senha) {
            if (!this.validatePassword(user.senha)) {
                errors.push("Senha deve ter no mínimo 8 caracteres, 1 número e 1 letra maiúscula")
            }
        }

        if (user.dataDeNascimento) {
            if (!this.validateBirthDate(user.dataDeNascimento)) {
                errors.push("Data de nascimento deve ser válida e estar no formato YYYY-MM-DD");
            }
        }

        return errors
    }
}

module.exports = new Validations()