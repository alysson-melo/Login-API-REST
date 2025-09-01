class Tables {
    init(dbConnection) {
        this.dbConnection = dbConnection
        this.CreateTableUser()
    }

    CreateTableUser() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            Nome VARCHAR(255) NOT NULL,
            NomeDeUsuario VARCHAR(255)NOT NULL,
            DataDeNascimento DATE NOT NULL, 
            Email VARCHAR(255) NOT NULL,
            Senha VARCHAR (255) NOT NULL,
            Sexo ENUM("Masculino", "Feminino") NOT NULL
            );`
        this.dbConnection.query(sql, (error) => {
            if (error) {
                console.log("Erro ao criar a tabela user...")
                console.log(error.message)
                return
            }
            console.log("Tabela user criada com sucesso...")
        })

    }
}

module.exports = new Tables()