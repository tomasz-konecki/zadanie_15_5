var App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        }
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });

        this.getGif(searchingText)
        .then(data => { 
                        var gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                            };
                        this.setState({
                            loading: false,
                            gif: gif,
                            searchingText: searchingText
                        });

        })
        .catch(error => console.log(error));

    },

    getGif: function(searchingText, callback) {

        return new Promise(
            function(resolve, reject) {
                var GIPHY_API_URL = 'http://api.giphy.com',
                    GIPHY_PUB_KEY = 'hUzWNheMHr7KPeZM3lGHSoUyq5rDSIik',
                    url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText,
                    xhr = new XMLHttpRequest(); 

                xhr.open('GET', url);
                xhr.send();
        
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText).data;
                        resolve(data);
                    }
                    else {
                        reject(new Error(this.error));
                    }
                };

                xhr.onerror = function() {
                    reject(new Error(
                        `XMLHttpRequest Error: ${this.error}`));
                };

        });
    },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIF-ow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
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