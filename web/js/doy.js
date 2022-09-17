$(document).ready(
    function () {
        var e = new Date;
        function t(e) {
            return e.getFullYear() + "-" + ("00" + (e.getMonth() + 1)).slice(-2) + "-" + ("00" + e.getDate()).slice(-2)
        }
        function n(e) {
            return Math.ceil((e - new Date(e.getFullYear(), 0, 1)) / 864e5)
        }
        $('form input[type="date"]').val(t(e)), $('form input[type="number"]').val(n(e)), $('form input[type="date"]').on("change", function () {
            var e = $('form input[type="date"]').val();
            e || ($('form input[type="date"]').val(t(new Date)), e = $('form input[type="date"]').val()), e = new Date(parseInt(e.slice(0, 4)), parseInt(e.slice(5, 7)) - 1, parseInt(e.slice(8, 10)), 1), $('form input[type="number"]').val(n(e))
        }), 
        $('form input[type="number"]').on("change", function () {
            var e = $('form input[type="date"]').val();
            (e = new Date(parseInt(e.slice(0, 4)), 0, 1, 1)).setDate(parseInt($('form input[type="number"]').val())), $('form input[type="date"]').val(t(e))
        }), 
        $("form").on("submit", function () {
            return !1
        })
    }
);