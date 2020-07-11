let EventEmitter = require('events');

export default class Subscriber extends EventEmitter {
  constructor(lightning) {
    super();
    this.lightning = lightning;
    this.start();
  }

  start() {
    this.subscribeTransactions();
    this.subscribeInvoices();
  }

  subscribeTransactions() {
    const call = this.lightning.subscribeTransactions({});
    call.on('data', function(response) {
      // A response was received from the server.
      console.info('New Transaction');
      console.log(response);
      this.emit('tx', response);
    });
    console.info('Listening for new Transactions...');
  }

  subscribeInvoices() {
    const request = {
      add_index: 0,
      settle_index: 0,
    };
    const call = this.lightning.subscribeInvoices(request);
    call.on('data', function(response) {

      // A response was received from the server.
      console.info('Payment');
      console.log(response);
      this.emit('payment', response);
    });
    console.info('Listening for new Invoices...');
  }


}
