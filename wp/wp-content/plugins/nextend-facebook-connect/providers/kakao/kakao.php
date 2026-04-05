<?php

class NextendSocialProviderKakao extends NextendSocialProviderDummy {

    protected $color = '#000000';

    public function __construct() {
        $this->id     = 'kakao';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/kakao/';
        $this->label  = 'Kakao';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderKakao());