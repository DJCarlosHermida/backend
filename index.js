class TicketManager {
    #precioBaseDeGanancia = 0.65
    constructor() {
        this.eventos = []
    }
    getEventos() {
        return this.eventos
    }
    agregarEvento(nombre, lugar, precio, capacidad = 150, fecha = new Date()) {
        const id = this.eventos.length === 0 ? 1 : this.eventos[this.eventos.length - 1].id + 1

        const evento = {
            id,
            nombre,
            lugar,
            precio: precio / this.#precioBaseDeGanancia,
            capacidad,
            fecha,
            participantes: []
        }
        this.eventos.push(evento)

    }
}

const manager = new TicketManager()
    manager.agregarEvento('XV', 'Young', 13000, 150)
    manager.agregarEvento('XXX', 'Montevideo', 1260, 1250)
    manager.agregarEvento('Show', 'Young', 60, 1150)
console.log(manager);