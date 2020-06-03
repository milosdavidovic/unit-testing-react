// this is just a fake module to simulate interacting with a server

// simulate the network request time...
const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

async function createTransaction(amount: number) {
  await sleep(100);
  return { data: { success: true } };
}

export { createTransaction };
