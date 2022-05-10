import { connect } from "amqplib/callback_api";

connect("amqp://admin:admin@localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = "logs";
    var msg = process.argv.slice(2).join(" ") || "Hello World!";

    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
    for (let i = 0; i < 1; i++) {
      channel.publish(exchange, "cc", Buffer.from(msg + " " + i));
      console.log(" [x] Sent %s", msg + " " + i);
    }
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
