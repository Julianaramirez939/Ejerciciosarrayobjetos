class Banco {
  constructor() {
    this.cuentas = {
      '123456789': { pin: '1234', saldo: 1000000 },
      '987654321': { pin: '4321', saldo: 500000 },
    };
  }

  validarPIN(documento, pin) {
    if (this.cuentas[documento] && this.cuentas[documento].pin === pin) {
      return true;
    }
    return false;
  }

  consultarSaldo(documento) {
    return this.cuentas[documento] ? this.cuentas[documento].saldo : 0;
  }

  realizarRetiro(documento, monto) {
    if (
      this.cuentas[documento] &&
      monto % 50000 === 0 &&
      this.cuentas[documento].saldo >= monto
    ) {
      this.cuentas[documento].saldo -= monto;
      return true;
    }
    return false;
  }

  realizarDeposito(documento, monto, tipo) {
    if (this.cuentas[documento] && monto > 0) {
      if (tipo === 'efectivo') {
        this.cuentas[documento].saldo += monto;
      } else if (tipo === 'cheque') {
        this.cuentas[documento].saldo += monto * 0.9;
      }
      return true;
    }
    return false;
  }

  realizarTransferencia(origen, destino, monto) {
    if (
      this.cuentas[origen] &&
      this.cuentas[destino] &&
      monto > 0 &&
      this.cuentas[origen].saldo >= monto
    ) {
      this.cuentas[origen].saldo -= monto;
      this.cuentas[destino].saldo += monto;
      return true;
    }
    return false;
  }
}

class CajeroAutomatico {
  constructor() {
    this.banco = new Banco();
    this.clienteActual = null;
    this.intentosPin = 0;
    this.tarjetas = []; // Cambiamos a un array para almacenar tarjetas de identidad y PINS
    this.maxIntentosPin = 3;
  }

  mostrarMenu() {
    return prompt(
      'Menú de opciones:\n' +
        '1. Realizar retiro\n' +
        '2. Realizar depósito\n' +
        '3. Realizar transferencia\n' +
        '4. Consultar saldo\n' +
        '5. Salir\n' +
        'Ingrese la opción deseada:'
    );
  }

  iniciar() {
    alert('¡Bienvenido al Cajero Automático!');
    
    // Pedir documento de identidad y PIN al inicio
    const documento = this.leerTexto('Ingrese su documento de identidad: ');
    const pin = this.leerTexto('Ingrese su PIN de 4 dígitos: ');

    // Guardar la tarjeta de identidad y el PIN en el array
    this.tarjetas.push({ documento, pin });

    // Autenticar al cliente
    if (!this.autenticarCliente(documento, pin)) {
      return;
    }

    while (true) {
      const opcion = this.mostrarMenu();

      switch (opcion) {
        case '1':
          this.realizarRetiro();
          break;
        case '2':
          this.realizarDeposito();
          break;
        case '3':
          this.realizarTransferencia();
          break;
        case '4':
          this.consultarSaldo();
          break;
        case '5':
          alert('Gracias por usar el Cajero Automático. ¡Hasta luego!');
          return;
        default:
          alert('Opción no válida. Por favor, seleccione una opción válida.');
      }
    }
  }

  autenticarCliente(documento, pin) {
    if (this.banco.validarPIN(documento, pin)) {
      this.clienteActual = documento;
      this.intentosPin = 0;
      alert('Autenticación exitosa. ¡Bienvenido!');
      return true;
    } else {
      this.intentosPin++;
      alert('PIN incorrecto. Intento: ' + this.intentosPin);
      if (this.intentosPin >= this.maxIntentosPin) {
        alert('Demasiados intentos incorrectos. Saliendo.');
        return false;
      }
      return this.autenticarCliente(documento, pin);
    }
  }

  leerTexto(promptText) {
    return prompt(promptText);
  }

  realizarRetiro() {
    const monto = parseFloat(this.leerTexto('Ingrese el monto a retirar: '));
    if (isNaN(monto) || monto <= 0) {
      alert('Monto de retiro no válido.');
      return;
    }

    if (this.banco.realizarRetiro(this.clienteActual, monto)) {
      alert(`Retiro exitoso. Saldo actual: $${this.banco.consultarSaldo(this.clienteActual)}`);
    } else {
      alert('No se pudo realizar el retiro. Verifique su saldo o el monto ingresado.');
    }
  }

  realizarDeposito() {
    const monto = parseFloat(this.leerTexto('Ingrese el monto a depositar: '));
    if (isNaN(monto) || monto <= 0) {
      alert('Monto de depósito no válido.');
      return;
    }

    const tipoDeposito = this.leerTexto('Seleccione el tipo de depósito (efectivo/cheque): ');

    if (this.banco.realizarDeposito(this.clienteActual, monto, tipoDeposito)) {
      alert(`Depósito exitoso. Saldo actual: $${this.banco.consultarSaldo(this.clienteActual)}`);
    } else {
      alert('No se pudo realizar el depósito. Verifique su saldo o el tipo de depósito ingresado.');
    }
  }

  realizarTransferencia() {
    const destino = this.leerTexto('Ingrese el documento de identidad del destinatario: ');
    const monto = parseFloat(this.leerTexto('Ingrese el monto a transferir: '));
    if (isNaN(monto) || monto <= 0) {
      alert('Monto de transferencia no válido.');
      return;
    }

    if (this.banco.realizarTransferencia(this.clienteActual, destino, monto)) {
      alert(`Transferencia exitosa. Saldo actual: $${this.banco.consultarSaldo(this.clienteActual)}`);
    } else {
      alert('No se pudo realizar la transferencia. Verifique su saldo, el destinatario o el monto ingresado.');
    }
  }

  consultarSaldo() {
    const saldo = this.banco.consultarSaldo(this.clienteActual);
    alert(`Su saldo actual es: $${saldo}`);
  }
}

// Resto del código para crear una instancia de CajeroAutomatico y llamar a iniciar()

const cajero = new CajeroAutomatico();
cajero.iniciar();










