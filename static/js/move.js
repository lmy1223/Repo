        function tagCloud (ele) {
            this.radius = 70;
            this.dtr = Math.PI/180;
            this.d=200;
            this.mcList = [];
            this.active = false;
            this.lasta = 1;
            this.lastb = 1;
            this.distr = true;
            this.tspeed=1;
            this.size=250;

            this.mouseX=0;
            this.mouseY=0;

            this.howElliptical=1;

            this.aA=null;
            this.oDiv=null;

            this.sa = null;
            this.ca = null;
            this.sb = null;
            this.cb = null;
            this.sc = null;
            this.cc = null;

        }

        tagCloud.prototype = {
            sineCosine:function(a, b, c)
            {
                var that = this;
                dtr = that.dtr;
                this.sa = Math.sin(a * dtr);
                this.ca = Math.cos(a * dtr);
                this.sb = Math.sin(b * dtr);
                this.cb = Math.cos(b * dtr);
                this.sc = Math.sin(c * dtr);
                this.cc = Math.cos(c * dtr);
            },
            doPosition:function()
            {
                var l=this.oDiv.offsetWidth/2;
                var t=this.oDiv.offsetHeight/2;
                for(var i=0;i<this.mcList.length;i++)
                {
                    this.aA[i].style.left=this.mcList[i].cx+l-this.mcList[i].offsetWidth/2+'px';
                    this.aA[i].style.top=this.mcList[i].cy+t-this.mcList[i].offsetHeight/2+'px';

                    this.aA[i].style.fontSize=12*this.mcList[i].scale/2+6+'px';

                    this.aA[i].style.filter="alpha(opacity="+100*this.mcList[i].alpha+")";
                    this.aA[i].style.opacity=this.mcList[i].alpha;
                }
            },
            positionAll:function()
            {
                var that = this;
                var phi=0;
                var theta=0;
                var max=that.mcList.length;
                var i=0;

                var aTmp=[];
                var oFragment=document.createDocumentFragment();

                sa = this.sa;
                ca = this.ca;
                sb = this.sb;
                cb = this.cb;
                sc = this.sc;
                cc = this.cc;

                //Ëæ»úÅÅÐò
                for(i=0;i<that.aA.length;i++)
                {
                    aTmp.push(that.aA[i]);
                }

                aTmp.sort
                (
                    function ()
                    {
                        return Math.random()<0.5?1:-1;
                    }
                );

                for(i=0;i<aTmp.length;i++)
                {
                    oFragment.appendChild(aTmp[i]);
                }

                that.oDiv.appendChild(oFragment);

                for( var i=1; i<max+1; i++){
                    if( that.distr )
                    {
                        phi = Math.acos(-1+(2*i-1)/max);
                        theta = Math.sqrt(max*Math.PI)*phi;
                    }
                    else
                    {
                        phi = Math.random()*(Math.PI);
                        theta = Math.random()*(2*Math.PI);
                    }
                    //×ø±ê±ä»»
                    that.mcList[i-1].cx = that.radius * Math.cos(theta)*Math.sin(phi);
                    that.mcList[i-1].cy = that.radius * Math.sin(theta)*Math.sin(phi);
                    that.mcList[i-1].cz = that.radius * Math.cos(phi);

                    that.aA[i-1].style.left=that.mcList[i-1].cx+that.oDiv.offsetWidth/2-that.mcList[i-1].offsetWidth/2+'px';
                    that.aA[i-1].style.top=that.mcList[i-1].cy+that.oDiv.offsetHeight/2-that.mcList[i-1].offsetHeight/2+'px';
                }
            },
            depthSort:function()
            {
                var that = this;
                var i=0;
                var aTmp=[];

                for(i=0;i<that.aA.length;i++)
                {
                    aTmp.push(that.aA[i]);
                }

                aTmp.sort
                (
                    function (vItem1, vItem2)
                    {
                        if(vItem1.cz>vItem2.cz)
                        {
                            return -1;
                        }
                        else if(vItem1.cz<vItem2.cz)
                        {
                            return 1;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                );

                for(i=0;i<aTmp.length;i++)
                {
                    aTmp[i].style.zIndex=i;
                }
            },
            update:function()
            {
                var that = this;
                lasta = that.lasta;
                lastb = that.lastb;
                mcList = that.mcList;
                sa = that.sa;
                ca = that.ca;
                sb = that.sb;
                cb = that.cb;
                sc = that.sc;
                cc = that.cc;
                radius = that.radius;
                tspeed = that.tspeed;
                size = that.size;
                mouseX = that.mouseX;
                mouseY = that.mouseY;
                howElliptical = that.howElliptical;
                d = that.d;


                var a;
                var b;

                if(that.active)
                {
                    a = (-Math.min( Math.max( -mouseY, -size ), size ) / radius ) * tspeed;
                    b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
                }
                else
                {
                    a = lasta * 0.98;
                    b = lastb * 0.98;
                }

                lasta=a;
                lastb=b;

                if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
                {
                    return;
                }

                var c=0;
                that.sineCosine(a,b,c);
                for(var j=0;j<mcList.length;j++)
                {
                    var rx1=mcList[j].cx;
                    var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
                    var rz1=mcList[j].cy*sa+mcList[j].cz*ca;

                    var rx2=rx1*cb+rz1*sb;
                    var ry2=ry1;
                    var rz2=rx1*(-sb)+rz1*cb;

                    var rx3=rx2*cc+ry2*(-sc);
                    var ry3=rx2*sc+ry2*cc;
                    var rz3=rz2;

                    mcList[j].cx=rx3;
                    mcList[j].cy=ry3;
                    mcList[j].cz=rz3;

                    per=d/(d+rz3);

                    mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
                    mcList[j].y=ry3*per;
                    mcList[j].scale=per;
                    mcList[j].alpha=per;

                    mcList[j].alpha=(mcList[j].alpha-0.6)*(10/6);
                }

                that.doPosition();
                that.depthSort();
            },
            load:function (ele)
            {
                var that = this;
                var i=0;
                var oTag=null;

                that.oDiv=document.getElementById(ele);

                that.aA=that.oDiv.getElementsByTagName('a');

                for(i=0;i<that.aA.length;i++)
                {
                    oTag={};

                    oTag.offsetWidth=that.aA[i].offsetWidth;
                    oTag.offsetHeight=that.aA[i].offsetHeight;

                    that.mcList.push(oTag);
                }

                that.sineCosine( 0,0,0 );

                that.positionAll();

                that.oDiv.onmouseover=function ()
                {
                    that.active=true;
                };

                that.oDiv.onmouseout=function ()
                {
                    that.active=false;
                };

                that.oDiv.onmousemove=function (ev)
                {
                    var oEvent=window.event || ev;

                    that.mouseX=oEvent.clientX-($('.task-index.content')[0].offsetLeft+that.oDiv.offsetWidth/2);
                    that.mouseY=oEvent.clientY-($(that.oDiv).parent().position().top+60-$("body").scrollTop()+that.oDiv.offsetHeight/2);

                    that.mouseX/=3;
                    that.mouseY/=5;
                };

                (function () {
                    that.update();
                    setTimeout(arguments.callee, 20);
                })();

            },
        }

        var x = new tagCloud('taskhead');
        x.load('taskhead');