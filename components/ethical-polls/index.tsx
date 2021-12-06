import Poll from "@components/poll";

function EthicalPolls() {
  const data = Array.from(Array(100).keys()).map((idx) => ({ id: idx })); //FIXME: 존재하는 id만 불러오는 api 필요

  return (
    <>
      {data.map((el, idx) => (
        <Poll id={el.id} key={idx} />
      ))}
    </>
  );
}

export default EthicalPolls;
