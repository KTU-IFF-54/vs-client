## Routes

```javascript
@AppModule {
    `\**`                         => `\connect`     // default root
    `\conncet`                    => Connect        // connect to server as user
    `\session`                    => Lobby          // view, create, join sessions
    `        \${id}`              => Session        // select video source, redirect to exiting one
    `              \direct-video` => VideoPlayer    // direct source player
    `              \youtube`      => YoutubePlayer  // youtube player
}
```

