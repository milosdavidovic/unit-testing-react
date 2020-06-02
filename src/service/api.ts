// this is just a fake module to simulate interacting with a server

// simulate the network request time...
const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

async function createTransaction(amount: number) {
  await sleep(500);
  return { data: { success: true } };
}

async function savePost(postData: any) {
  await sleep(1000);
  return { data: { post: postData } };
}

const greetings = ["Hello", "Hi", "Hey there", `What's up`, "Howdy", `G'day`];

async function loadGreeting(subject: any) {
  return { data: { greeting: `${await fetchRandomGreeting()} ${subject}` } };
}

async function fetchRandomGreeting() {
  await sleep(1000);
  return greetings[Math.floor(Math.random() * greetings.length)];
}

// a fire-and-forget function to report errors
// for componentDidCatch
async function reportError() {
  await sleep(1000);
  return { success: true };
}

async function submitForm() {
  await sleep(1000);
  return { success: true };
}

export { savePost, loadGreeting, reportError, submitForm, createTransaction };
