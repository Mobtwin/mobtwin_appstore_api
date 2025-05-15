const Express = require("express");
const app = Express();
const router = require("./routes/app.route");
const proxyRouter = require("./routes/proxy.route");
const { errorHandler } = require("./interactors/app.interactor");
const fs = require("fs"); // Import the fs module

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(Express.json());
app.use("/api/", router);
app.use("/proxy/", proxyRouter);
app.use(errorHandler);
function transformStringToObject(inputString) {
  // Split the input string by the colon delimiter
  const [host, port, username, password] = inputString.split(":");

  // Return the transformed object
  return {
    host,
    port,
    username,
    password,
  };
}

app.get("/", function (req, res) {
  res.redirect("/api");
});

app.listen(PORT, function () {
  console.log(`Server is listening on http://localhost:${PORT}`);
//   const proxies = `109.61.89.1:17443:owenislaa:WnEJVYQZFL
// 109.61.89.1:17528:owenislaa:WnEJVYQZFL
// 109.61.89.1:17427:owenislaa:WnEJVYQZFL
// 109.61.89.1:17419:owenislaa:WnEJVYQZFL
// 109.61.89.1:17515:owenislaa:WnEJVYQZFL
// 109.61.89.1:17418:owenislaa:WnEJVYQZFL
// 109.61.89.1:17403:owenislaa:WnEJVYQZFL
// 109.61.89.1:17584:owenislaa:WnEJVYQZFL
// 109.61.89.1:11651:owenislaa:WnEJVYQZFL
// 109.61.89.1:17607:owenislaa:WnEJVYQZFL
// 109.61.89.1:17603:owenislaa:WnEJVYQZFL
// 109.61.89.1:17635:owenislaa:WnEJVYQZFL
// 109.61.89.1:17533:owenislaa:WnEJVYQZFL
// 109.61.89.1:17399:owenislaa:WnEJVYQZFL
// 109.61.89.1:17535:owenislaa:WnEJVYQZFL
// 109.61.89.1:17546:owenislaa:WnEJVYQZFL
// 109.61.89.1:17569:owenislaa:WnEJVYQZFL
// 109.61.89.1:17610:owenislaa:WnEJVYQZFL
// 109.61.89.1:17628:owenislaa:WnEJVYQZFL
// 109.61.89.1:17511:owenislaa:WnEJVYQZFL
// 109.61.89.1:17633:owenislaa:WnEJVYQZFL
// 109.61.89.1:17599:owenislaa:WnEJVYQZFL
// 109.61.89.1:17395:owenislaa:WnEJVYQZFL
// 109.61.89.1:17560:owenislaa:WnEJVYQZFL
// 109.61.89.1:17611:owenislaa:WnEJVYQZFL
// 109.61.89.1:17581:owenislaa:WnEJVYQZFL
// 109.61.89.1:17532:owenislaa:WnEJVYQZFL
// 109.61.89.1:17568:owenislaa:WnEJVYQZFL
// 109.61.89.1:17617:owenislaa:WnEJVYQZFL
// 109.61.89.1:11648:owenislaa:WnEJVYQZFL
// 109.61.89.1:17459:owenislaa:WnEJVYQZFL
// 109.61.89.1:17416:owenislaa:WnEJVYQZFL
// 109.61.89.1:17514:owenislaa:WnEJVYQZFL
// 109.61.89.1:17555:owenislaa:WnEJVYQZFL
// 109.61.89.1:17451:owenislaa:WnEJVYQZFL
// 109.61.89.1:17531:owenislaa:WnEJVYQZFL
// 109.61.89.1:17602:owenislaa:WnEJVYQZFL
// 109.61.89.1:17618:owenislaa:WnEJVYQZFL
// 109.61.89.1:17446:owenislaa:WnEJVYQZFL
// 109.61.89.1:17405:owenislaa:WnEJVYQZFL
// 109.61.89.1:17588:owenislaa:WnEJVYQZFL
// 109.61.89.1:17549:owenislaa:WnEJVYQZFL
// 109.61.89.1:17583:owenislaa:WnEJVYQZFL
// 109.61.89.1:17544:owenislaa:WnEJVYQZFL
// 109.61.89.1:17630:owenislaa:WnEJVYQZFL
// 109.61.89.1:17631:owenislaa:WnEJVYQZFL
// 109.61.89.1:17407:owenislaa:WnEJVYQZFL
// 109.61.89.1:17430:owenislaa:WnEJVYQZFL
// 109.61.89.1:17529:owenislaa:WnEJVYQZFL
// 109.61.89.1:17589:owenislaa:WnEJVYQZFL
// 109.61.89.1:17537:owenislaa:WnEJVYQZFL
// 109.61.89.1:17590:owenislaa:WnEJVYQZFL
// 109.61.89.1:17592:owenislaa:WnEJVYQZFL
// 109.61.89.1:17595:owenislaa:WnEJVYQZFL
// 109.61.89.1:17609:owenislaa:WnEJVYQZFL
// 109.61.89.1:17545:owenislaa:WnEJVYQZFL
// 109.61.89.1:17623:owenislaa:WnEJVYQZFL
// 109.61.89.1:17452:owenislaa:WnEJVYQZFL
// 109.61.89.1:17435:owenislaa:WnEJVYQZFL
// 109.61.89.1:17605:owenislaa:WnEJVYQZFL
// 109.61.89.1:17447:owenislaa:WnEJVYQZFL
// 109.61.89.1:17433:owenislaa:WnEJVYQZFL
// 109.61.89.1:17417:owenislaa:WnEJVYQZFL
// 109.61.89.1:17428:owenislaa:WnEJVYQZFL
// 109.61.89.1:17551:owenislaa:WnEJVYQZFL
// 109.61.89.1:17423:owenislaa:WnEJVYQZFL
// 109.61.89.1:17450:owenislaa:WnEJVYQZFL
// 109.61.89.1:17626:owenislaa:WnEJVYQZFL
// 109.61.89.1:17420:owenislaa:WnEJVYQZFL
// 109.61.89.1:17400:owenislaa:WnEJVYQZFL
// 109.61.89.1:17449:owenislaa:WnEJVYQZFL
// 109.61.89.1:17429:owenislaa:WnEJVYQZFL
// 109.61.89.1:17559:owenislaa:WnEJVYQZFL
// 109.61.89.1:17409:owenislaa:WnEJVYQZFL
// 109.61.89.1:17454:owenislaa:WnEJVYQZFL
// 109.61.89.1:17408:owenislaa:WnEJVYQZFL
// 109.61.89.1:17436:owenislaa:WnEJVYQZFL
// 109.61.89.1:17516:owenislaa:WnEJVYQZFL
// 109.61.89.1:17556:owenislaa:WnEJVYQZFL
// 109.61.89.1:17434:owenislaa:WnEJVYQZFL
// 109.61.89.1:17425:owenislaa:WnEJVYQZFL
// 109.61.89.1:17612:owenislaa:WnEJVYQZFL
// 109.61.89.1:17457:owenislaa:WnEJVYQZFL
// 109.61.89.1:17601:owenislaa:WnEJVYQZFL
// 109.61.89.1:17397:owenislaa:WnEJVYQZFL
// 109.61.89.1:17512:owenislaa:WnEJVYQZFL
// 109.61.89.1:17456:owenislaa:WnEJVYQZFL
// 109.61.89.1:17518:owenislaa:WnEJVYQZFL
// 109.61.89.1:17393:owenislaa:WnEJVYQZFL
// 109.61.89.1:17554:owenislaa:WnEJVYQZFL
// 109.61.89.1:17552:owenislaa:WnEJVYQZFL
// 109.61.89.1:17513:owenislaa:WnEJVYQZFL
// 109.61.89.1:17401:owenislaa:WnEJVYQZFL
// 109.61.89.1:17600:owenislaa:WnEJVYQZFL
// 109.61.89.1:17524:owenislaa:WnEJVYQZFL
// 109.61.89.1:17392:owenislaa:WnEJVYQZFL
// 109.61.89.1:17396:owenislaa:WnEJVYQZFL
// 109.61.89.1:17413:owenislaa:WnEJVYQZFL
// 109.61.89.1:17565:owenislaa:WnEJVYQZFL
// 109.61.89.1:17550:owenislaa:WnEJVYQZFL
// 109.61.89.1:17526:owenislaa:WnEJVYQZFL
// 109.61.89.1:17438:owenislaa:WnEJVYQZFL
// 109.61.89.1:17523:owenislaa:WnEJVYQZFL
// 109.61.89.1:17440:owenislaa:WnEJVYQZFL
// 109.61.89.1:17620:owenislaa:WnEJVYQZFL
// 109.61.89.1:17394:owenislaa:WnEJVYQZFL
// 109.61.89.1:17414:owenislaa:WnEJVYQZFL
// 109.61.89.1:17426:owenislaa:WnEJVYQZFL
// 109.61.89.1:17542:owenislaa:WnEJVYQZFL
// 109.61.89.1:17525:owenislaa:WnEJVYQZFL
// 109.61.89.1:17519:owenislaa:WnEJVYQZFL
// 109.61.89.1:17421:owenislaa:WnEJVYQZFL
// 109.61.89.1:17444:owenislaa:WnEJVYQZFL
// 109.61.89.1:17412:owenislaa:WnEJVYQZFL
// 109.61.89.1:17437:owenislaa:WnEJVYQZFL
// 109.61.89.1:17415:owenislaa:WnEJVYQZFL
// 109.61.89.1:17458:owenislaa:WnEJVYQZFL
// 109.61.89.1:17539:owenislaa:WnEJVYQZFL
// 109.61.89.1:17530:owenislaa:WnEJVYQZFL
// 109.61.89.1:17586:owenislaa:WnEJVYQZFL
// 109.61.89.1:11645:owenislaa:WnEJVYQZFL
// 109.61.89.1:17520:owenislaa:WnEJVYQZFL
// 109.61.89.1:17536:owenislaa:WnEJVYQZFL
// 109.61.89.1:11649:owenislaa:WnEJVYQZFL
// 109.61.89.1:17442:owenislaa:WnEJVYQZFL
// 109.61.89.1:17567:owenislaa:WnEJVYQZFL
// 109.61.89.1:17406:owenislaa:WnEJVYQZFL
// 109.61.89.1:11652:owenislaa:WnEJVYQZFL
// 109.61.89.1:11626:owenislaa:WnEJVYQZFL
// 109.61.89.1:17422:owenislaa:WnEJVYQZFL
// 109.61.89.1:17593:owenislaa:WnEJVYQZFL
// 109.61.89.1:17391:owenislaa:WnEJVYQZFL
// 109.61.89.1:11624:owenislaa:WnEJVYQZFL
// 109.61.89.1:17453:owenislaa:WnEJVYQZFL
// 109.61.89.1:17613:owenislaa:WnEJVYQZFL
// 109.61.89.1:17632:owenislaa:WnEJVYQZFL
// 109.61.89.1:17619:owenislaa:WnEJVYQZFL
// 109.61.89.1:11643:owenislaa:WnEJVYQZFL
// 109.61.89.1:17624:owenislaa:WnEJVYQZFL
// 109.61.89.1:17622:owenislaa:WnEJVYQZFL
// 109.61.89.1:17625:owenislaa:WnEJVYQZFL
// 109.61.89.1:17566:owenislaa:WnEJVYQZFL
// 109.61.89.1:11644:owenislaa:WnEJVYQZFL
// 109.61.89.1:17517:owenislaa:WnEJVYQZFL
// 109.61.89.1:17629:owenislaa:WnEJVYQZFL
// 109.61.89.1:17460:owenislaa:WnEJVYQZFL
// 109.61.89.1:17557:owenislaa:WnEJVYQZFL
// 109.61.89.1:17606:owenislaa:WnEJVYQZFL
// 109.61.89.1:17441:owenislaa:WnEJVYQZFL
// 109.61.89.1:11669:owenislaa:WnEJVYQZFL
// 109.61.89.1:17562:owenislaa:WnEJVYQZFL
// 109.61.89.1:11647:owenislaa:WnEJVYQZFL
// 109.61.89.1:17410:owenislaa:WnEJVYQZFL
// 109.61.89.1:11625:owenislaa:WnEJVYQZFL
// 109.61.89.1:17547:owenislaa:WnEJVYQZFL
// 109.61.89.1:17621:owenislaa:WnEJVYQZFL
// 109.61.89.1:17608:owenislaa:WnEJVYQZFL
// 109.61.89.1:17398:owenislaa:WnEJVYQZFL
// 109.61.89.1:17521:owenislaa:WnEJVYQZFL
// 109.61.89.1:11642:owenislaa:WnEJVYQZFL
// 109.61.89.1:17445:owenislaa:WnEJVYQZFL
// 109.61.89.1:17538:owenislaa:WnEJVYQZFL
// 109.61.89.1:17432:owenislaa:WnEJVYQZFL
// 109.61.89.1:17627:owenislaa:WnEJVYQZFL
// 109.61.89.1:17634:owenislaa:WnEJVYQZFL
// 109.61.89.1:17553:owenislaa:WnEJVYQZFL
// 109.61.89.1:17585:owenislaa:WnEJVYQZFL
// 109.61.89.1:17439:owenislaa:WnEJVYQZFL
// 109.61.89.1:17534:owenislaa:WnEJVYQZFL
// 109.61.89.1:17411:owenislaa:WnEJVYQZFL
// 109.61.89.1:17594:owenislaa:WnEJVYQZFL
// 109.61.89.1:17522:owenislaa:WnEJVYQZFL
// 109.61.89.1:17448:owenislaa:WnEJVYQZFL
// 109.61.89.1:17548:owenislaa:WnEJVYQZFL
// 109.61.89.1:17455:owenislaa:WnEJVYQZFL
// 109.61.89.1:17561:owenislaa:WnEJVYQZFL
// 109.61.89.1:17564:owenislaa:WnEJVYQZFL
// 109.61.89.1:17591:owenislaa:WnEJVYQZFL
// 109.61.89.1:17597:owenislaa:WnEJVYQZFL
// 109.61.89.1:11650:owenislaa:WnEJVYQZFL
// 109.61.89.1:17402:owenislaa:WnEJVYQZFL
// 109.61.89.1:17541:owenislaa:WnEJVYQZFL
// 109.61.89.1:17604:owenislaa:WnEJVYQZFL
// 109.61.89.1:17582:owenislaa:WnEJVYQZFL
// 109.61.89.1:17540:owenislaa:WnEJVYQZFL
// 109.61.89.1:17527:owenislaa:WnEJVYQZFL
// 109.61.89.1:17587:owenislaa:WnEJVYQZFL
// 109.61.89.1:11646:owenislaa:WnEJVYQZFL
// 109.61.89.1:17558:owenislaa:WnEJVYQZFL
// 109.61.89.1:17563:owenislaa:WnEJVYQZFL
// 109.61.89.1:17424:owenislaa:WnEJVYQZFL
// 109.61.89.1:17431:owenislaa:WnEJVYQZFL
// 109.61.89.1:17614:owenislaa:WnEJVYQZFL
// 109.61.89.1:17615:owenislaa:WnEJVYQZFL
// 109.61.89.1:17616:owenislaa:WnEJVYQZFL
// 109.61.89.1:17570:owenislaa:WnEJVYQZFL
// 109.61.89.1:17596:owenislaa:WnEJVYQZFL
// 109.61.89.1:17404:owenislaa:WnEJVYQZFL
// 109.61.89.1:17543:owenislaa:WnEJVYQZFL
// 109.61.89.1:17598:owenislaa:WnEJVYQZFL`.split("\n");
//   const formatted = proxies.map((p) => transformStringToObject(p));
//   // Convert the formatted data to a JSON string
//   const jsonData = JSON.stringify({ formatted }, null, 2); // Pretty-print with 2 spaces

//   // Write the JSON data to a file
//   fs.writeFile("proxies.json", jsonData, (err) => {
//     if (err) {
//       console.error("Error writing to file:", err);
//     } else {
//       console.log("Data successfully written to proxies.json");
//     }
//   });
});
