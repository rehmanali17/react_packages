import Posts from "./components/Posts";
import {QueryClientProvider, QueryClient} from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";
import AddPost from "./components/AddPost";
import Layout from "./components/Layout";
import EditPost from "./components/EditPost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  pallete: {
    primary: {
      main: '#fefefe'
    }
  }
})

const queryClient = new QueryClient()

function App() {
  return (
      <Router>
        <QueryClientProvider client={queryClient}>
        <Layout>
          <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/add" component={AddPost} />
              <Route exact path="/edit/:id" component={EditPost} />
            </Switch> 
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Router>
  );
}

export default App;
