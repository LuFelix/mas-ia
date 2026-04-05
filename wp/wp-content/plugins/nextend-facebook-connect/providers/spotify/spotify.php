<?php

class NextendSocialProviderSpotify extends NextendSocialProviderDummy {

    protected $color = '#1DB954';

    public function __construct() {
        $this->id     = 'spotify';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/spotify/';
        $this->label  = 'Spotify';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderSpotify());