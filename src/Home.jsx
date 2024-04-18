function Home() {
    return (
      <>
        <main>
            <div className="entry">
                <div className="entry-example">
                    <h2>Turn this</h2>
                    <img className="responsive" src="/assets/ford.jpg" />
                </div>
                <i className="fa fa-exchange"></i>
                <div className="entry-example">
                    <h2>into that</h2>
                    <img className="responsive" src="/assets/mazda.jpg" />
                </div>
                <div className="entry-example">
                    <h2>by swapping your car with fellow owners!</h2>
                </div>
            </div>
            <div className="entry">
                <div className="entry-example">
                    <h2><a href="authenticate.html">Sign up today to trade your car!</a></h2>
                </div>
                <div><h3>or</h3></div>
                <div className="entry-example">
                    <h2><a href="browse.html">Browse the listings without an account</a></h2>
                </div>
            </div>
        </main>
        <footer>
            <span>Created by <a href="https://github.com/ToadWalker37/startup">ToadWalker37</a></span>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
        
      </>
    )
  }

  export default Home