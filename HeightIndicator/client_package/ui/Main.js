function Main() {
    
    this.h = document.getElementById("height");
    this.d = document.getElementById("digital");
    this.a = document.getElementById("advice");
    this.interval = null;
    this.height = 1024;
    this.hidden = false;
    
    this.main = function() {
        this.interval = setInterval(this.getHeight, 100);
        this.hide();
        
        window.onkeydown = function(e) {
            if(e.which == 45 /*INSERT*/) {
                var main = window.__MAIN;
                main.toggle();
            }
        }
        
        // Next 2 events works ONLY WITH planes and helicopters. It's ignoring any other vehicles.
        jcmp.AddEvent("HeightIndicator_PlayerVehicleEntered", this.show);
        jcmp.AddEvent("HeightIndicator_PlayerVehicleExited", this.hide);
        jcmp.AddEvent("HeightIndicator_OnReturn", this.updateHeight);
    }
    
    this.show = function() {
        var main = window.__MAIN;
        main.hidden = false;
        main.h.style.display = main.d.style.display = "";
        document.body.removeChild(main.a);
    }
    
    this.hide = function() {
        var main = window.__MAIN;
        main.hidden = true;
        main.h.style.display = main.d.style.display = "none";
    }
    
    this.toggle = function() {
        var main = window.__MAIN;
        if(main.hidden) {
            main.show();
        } else {
            main.hide();
        }
    }
    
    this.getHeight = function() {
        jcmp.CallEvent("HeightIndicator_GetHeight");
    }
    
    this.countHeightPercent = function(height) {
        height = Math.floor(height);
        var min = 1024, max = 6000;
        
        if(height <= min) {
            return 0;
        } else if(height >= max) {
            return 100;
        }
        
        var bottom = 0, top = max - min, h = height - min;
        
        return Math.floor(h / top * 100);
    }
    
    this.updateHeight = function(height) {
        var main = window.__MAIN;
        main.height = height;
        
        main.d.innerHTML = Math.floor(height - 1024) + " M";
        main.h.value = main.countHeightPercent(height);
    }
}