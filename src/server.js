import setup from './app';

const port = process.env.PORT || 3000;

(async () => {
  try {
    const app = await setup();
    app.listen(port, () => console.log(`app running on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
