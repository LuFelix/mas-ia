<?php

class NextendSocialProviderDisqus extends NextendSocialProviderDummy {

    protected $color = '#2e9fff';

    public function __construct() {
        $this->id     = 'disqus';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/disqus/';
        $this->label  = 'Disqus';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderDisqus());