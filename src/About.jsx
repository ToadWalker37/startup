function About() {
    return (
      <>
          <main id="about">
              <div>
                  <h1>About</h1>
                  <p>A university student loved cars. He was also a computer science student. So when he wanted to trade his Chevy Camaro for a cooler car, he made his own website dedicated to trading vehicles.</p>
                  <p>We do alchemy here. Want to turn your car into another car? You're at the best place for that!</p>
                  <p>This is your one-stop shop for finding cars to swap. We hope you enjoy it and find your dream ride here!</p>
              </div>
              <div className="writeDev">
                  <h3>Write the developer</h3>
                  <div>
                      <label for="textarea">Message: </label>
                      <textarea id="long-text" name="varTextarea" placeholder="You must be signed in to send a message" disabled required></textarea>
                  </div>
                  <div className="aboutButton"><button className="btn" type="submit" id="feedback">Send my message</button></div>
              </div>
          </main>
          <footer>
              <p>Created by <a href="https://github.com/ToadWalker37/startup">ToadWalker37</a></p>
          </footer>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
      
      </>
    )
  }
  
  export default About