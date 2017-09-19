const App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        }
    },

    handleSearch(searchingText) {
        this.setState({
            loading: true
        });

        this.getGif(searchingText)
        .then(data => { 
                        const gif = {
                              url: data.fixed_width_downsampled_url,
                              sourceUrl: data.url
                              };

                        this.setState({
                            loading: false,
                            gif,
                            searchingText
                        });

        })
        .catch(error => console.log(error));

    },

    getGif(searchingText) {

        return new Promise(
            (resolve, reject) => {
                const GIPHY_API_URL = 'http://api.giphy.com',
                      GIPHY_PUB_KEY = 'hUzWNheMHr7KPeZM3lGHSoUyq5rDSIik',
                      url = `${GIPHY_API_URL}/v1/gifs/random?api_key=${GIPHY_PUB_KEY}&tag=${searchingText}`,
                      xhr = new XMLHttpRequest(); 

                xhr.open('GET', url);
                xhr.send();
        
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText).data;
                        resolve(data);
                    }
                    else {
                        reject(new Error(this.error));
                    }
                };

                xhr.onerror = () => {
                    reject(new Error(
                        `XMLHttpRequest Error: ${this.error}`));
                };

        });
    },

    render() {

        const styles = {
              margin: '0 auto',
              textAlign: 'center',
              width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIF-ów!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com' target="_blank">giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    }

});