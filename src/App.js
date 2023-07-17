import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";

//create a new QueryClient instance
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Universities />
    </QueryClientProvider>
  );
}

function Universities() {
  const { isLoading, error, data } = useQuery("universities", () =>
    fetch(
      "http://universities.hipolabs.com/search?country=United+States").then(
        (res) => res.json()
      )
    );

  //Render a loading message while the data is being fetched
  if (isLoading) return <div>Loading...</div>;

  //Render an error message if an error occurred while fetching data
  if (error) return <div>An error occurred:{error.message}</div>;

  //Render the list of universities retrieved from the api
  return (
    <div>
      <h1>Fetching data using React Query</h1>
      <h2>Universities in United States</h2>
      <ul>
        {data.map((university) => (
          <li key={university.name}>{university.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
