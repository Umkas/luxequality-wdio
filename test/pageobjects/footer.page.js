class Footer {
    get twitterIcon() { return $('[data-test="social-twitter"]'); }
    get facebookIcon() { return $('[data-test="social-facebook"]'); }
    get linkedinIcon() { return $('[data-test="social-linkedin"]'); }

    async clickTwitter() {
        await this.twitterIcon.click();
    }
    async clickFacebook() {
        await this.facebookIcon.click();
    }
    async clickLinkedin() {
        await this.linkedinIcon.click();
    }
}
export default new Footer();