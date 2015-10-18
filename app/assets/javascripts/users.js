$(function() {
	BillBlass.init.call(BillBlass);
});
BillBlass = {
	init: function() {
		this.Navigation.init();
	}
};

BillBlass.Navigation = {
	timeout: null,
	container: '#wrap',
	logoName: '#logo-name',
	followButton: '#follow-open',
	followSidebar: '#follow',
	contactButton: '#contact-open',
	contactSidebar: '#contact',
	shareButton: '#share-open',
  shareSidebar: '#share',
	speed: 500,
	logoSpeed: 1000,
	init: function() {
		this.bindSidebars();
	},
	/* Sidebars */
	bindSidebars: function() {
		$(this.followButton).on('mouseenter', function(e) {
			e.stopPropagation();
			this.openFollow();
      this.closeContact();
      this.closeShare();
		}.bind(this));
		$(this.contactButton).on('mouseenter', function(e) {
			e.stopPropagation();
			this.openContact();
      this.closeFollow();
      this.closeShare();
		}.bind(this));
		$(this.shareButton).on('mouseenter', function(e) {
			e.stopPropagation();
			this.openShare();
      this.closeFollow();
      this.closeContact();
		}.bind(this));
    $(this.followSidebar).on('mouseleave', function(e) {
			e.stopPropagation();
			this.closeFollow();
		}.bind(this));
		$(this.contactSidebar).on('mouseleave', function(e) {
			e.stopPropagation();
			this.closeContact();
		}.bind(this));
		$(this.shareSidebar).on('mouseleave', function(e) {
			e.stopPropagation();
			this.closeShare();
		}.bind(this));
	},
	openFollow: function() { this.setSidebarState(this.followButton, this.followSidebar, true); },
	closeFollow: function() { this.setSidebarState(this.followButton, this.followSidebar, false); },
	toggleFollow: function() { this.setSidebarState(this.followButton, this.followSidebar, null); },
	openContact: function() { this.setSidebarState(this.contactButton, this.contactSidebar, true); },
	closeContact: function() { this.setSidebarState(this.contactButton, this.contactSidebar, false); },
	toggleContact: function() { this.setSidebarState(this.contactButton, this.contactSidebar, null); },
	openShare: function() { this.setSidebarState(this.shareButton, this.shareSidebar, true); },
	closeShare: function() { this.setSidebarState(this.shareButton, this.shareSidebar, false); },
	toggleShare: function() { this.setSidebarState(this.shareButton, this.shareSidebar, null); },
	setSidebarState: function(button, sidebar, state) {
		$(button).toggleClass('open', state);
		$(sidebar).toggleClass('open', state);
	}
};

var CDown = function() {
  this.state=0;// if initialized
  this.counts=[];// array holding countdown date objects and id to print to {d:new Date(2013,11,18,18,54,36), id:"countbox1"}
  this.interval=null;// setInterval object
}
CDown.prototype = {
  init: function(){
    this.state=1;
    var self=this;
    this.interval=window.setInterval(function(){self.tick();}, 1000);
  },
  add: function(date,id){
    this.counts.push({d:date,id:id});
    this.tick();
    if(this.state==0) this.init();
  },
  expire: function(idxs){
    for(var x in idxs) {
      this.display(this.counts[idxs[x]], "Now!");
      this.counts.splice(idxs[x], 1);
    }
  },
  format: function(r){
    var out="";
    out += r.d +" "+((r.d==1)?"":"")+": ";
    out += (r.h<=9?'0':'')+r.h +" "+((r.h==1)?"":"")+": ";
    out += (r.m<=9?'0':'')+r.m +" "+((r.m==1)?"":"")+": ";
    out += (r.s<=9?'0':'')+r.s +" "+((r.s==1)?"":"")+": ";

    return out.substr(0,out.length-2);
  },
  math: function(work){
    var y=w=d=h=m=s=ms=0;

    ms=(""+((work%1000)+1000)).substr(1,3);
    work=Math.floor(work/1000);//kill the "milliseconds" so just secs

    y=Math.floor(work/31536000);//years (no leapyear support)
    w=Math.floor(work/604800);//weeks
    d=Math.floor(work/86400);//days
    work=work%86400;

    h=Math.floor(work/3600);//hours
    work=work%3600;

    m=Math.floor(work/60);//minutes
    work=work%60;

    s=Math.floor(work);//seconds

    return {y:y,w:w,d:d,h:h,m:m,s:s,ms:ms};
  },
  tick: function(){
    var now=(new Date()).getTime(),
    expired=[],cnt=0,amount=0;

    if(this.counts)
    for(var idx=0,n=this.counts.length; idx<n; ++idx){
      cnt=this.counts[idx];
      amount=cnt.d.getTime()-now;//calc milliseconds between dates

      // if time is already past
      if(amount<0){
        expired.push(idx);
      }
      // date is still good
      else{
        this.display(cnt, this.format(this.math(amount)));
      }
    }

    // deal with any expired
    if(expired.length>0) this.expire(expired);

    // if no active counts, stop updating
    if(this.counts.length==0) window.clearTimeout(this.interval);

  },
  display: function(cnt,msg){
    document.getElementById(cnt.id).innerHTML=msg;
  }
};

window.onload=function(){
  var cdown = new CDown();
  cdown.add(new Date(2015,10,2,9,00,0), "countbox");
};
