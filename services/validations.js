class Validations {
    fullNameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    userNameRegex = /^(?=.*[A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ0-9\s]+$/;

    validateFullName(fullName) {
        return this.fullNameRegex.test(fullName);
    }

    validateUserName(userName) {
        return this.userNameRegex.test(userName);
    }

    validateEmail(email) {
        return this.emailRegex.test(email);
    }

    validatePassword(password) {
        return this.passwordRegex.test(password);
    }

    validateBirthDate(birthDate) {
        const date = new Date(birthDate);
        const today = new Date();
        return !isNaN(date.getTime()) && date < today;
    }

    validateNewUser(user) {
        const errors = [];

        if (!this.validateFullName(user.nomeCompleto)) {
            errors.push("Nome completo deve conter apenas letras e espaços");
        }

        if (!this.validateUserName(user.nomeDeUsuario)) {
            errors.push("Nome de usuário deve conter apenas letras, números e espaços");
        }

        if (!this.validateEmail(user.email)) {
            errors.push("Formato de email inválido");
        }

        if (!this.validatePassword(user.senha)) {
            errors.push("Senha deve ter no mínimo 8 caracteres, 1 número e 1 letra maiúscula");
        }

        if (!this.validateBirthDate(user.dataDeNascimento)) {
            errors.push("Data de nascimento inválida");
        }

        return errors;
    }
}

module.exports = new Validations();