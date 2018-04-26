<script>
Vue.component("modal-erro", {
  props: [msgErro],
  data: function() {
    return {
      error: true,
      msgErro :''
    };
  },
  template: `<b-modal ref="modaInfo" title="Mensagem" hide-footer>
            <p :class="erro ? 'alert alert-danger': 'alert alert-info'">{{msgErro}}</p>
            </b-modal>`
});
</script>

