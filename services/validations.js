const validations = {
    fullNameRegex: /^[A-Za-zÀ-ÿ\s]+$/,
    passwordRegex: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    userNameRegex: /^(?=.*[A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ0-9\s]+$/,

    validateNewUser(user) {
        const errors = [];

        // Validar nome completo
        if (!this.fullNameRegex.test(user.nomeCompleto)) {
            errors.push("Nome completo deve conter apenas letras e espaços");
        }

        // Validar nome de usuário
        if (!this.userNameRegex.test(user.nomeDeUsuario)) {
            errors.push("Nome de usuário deve conter apenas letras, números e espaços");
        }

        // Validar email
        if (!this.emailRegex.test(user.email)) {
            errors.push("Formato de email inválido");
        }

        // Validar senha
        if (!this.passwordRegex.test(user.senha)) {
            errors.push("Senha deve ter no mínimo 8 caracteres, 1 número e 1 letra maiúscula");
        }

        // Validar data de nascimento
        const birthDate = new Date(user.dataDeNascimento);
        const today = new Date();
        if (isNaN(birthDate.getTime()) || birthDate > today) {
            errors.push("Data de nascimento inválida");
        }

        return errors;
    }
};

module.exports = validations;