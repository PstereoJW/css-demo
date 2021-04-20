const testFun = () => {
  console.log("build..");
};

new Promise(() => {
  console.log("resolve");
});

testFun();
