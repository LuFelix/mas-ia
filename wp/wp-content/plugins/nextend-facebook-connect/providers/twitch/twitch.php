<?php

class NextendSocialProviderTwitch extends NextendSocialProviderDummy {

    protected $color = '#9146FF';

    public function __construct() {
        $this->id     = 'twitch';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/twitch/';
        $this->label  = 'Twitch';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderTwitch());