<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="guestbook">
          <div class="loading loading-lg" v-if="load"></div>
          <div class="guestbook__title">Гостевая книга</div>   
          <div class="guestbook__form">
            <form @submit.prevent="addMessage">
              <div :class="'form-group' + (error_name.status ? ' has-error': '')">
                <label class="form-label" >Имя</label>
                <input class="form-input" type="text" v-model="name" name="name" placeholder="" @keyup="enterField($event, 'error_name')">
                <p class="form-input-hint" v-if="error_name.status">{{ error_name.msg }}</p>
              </div>
              <div :class="'form-group' + (error_email.status ? ' has-error': '')">
                <label class="form-label" >Email</label>
                <input class="form-input" type="text" v-model="email" name="email" @keyup="enterField($event, 'error_email')">
                <p class="form-input-hint" v-if="error_email.status">{{ error_email.msg }}</p>
              </div>
              <div :class="'form-group' + (error_text.status ? ' has-error': '')">
                <label class="form-label">Сообщение</label>
                <textarea class="form-input" v-model="text" name="text" rows="3" @keyup="enterField($event, 'error_text')"></textarea>
                <p class="form-input-hint" v-if="error_text.status">{{ error_text.msg }}</p>
              </div>
              <button class="btn btn-primary btn-lg">Отправить</button>
            </form>
          </div>
          <div class="divider"></div>
          <div class="guestbook__messagelist">
            <div class="guestbook__messagelist__item" v-for="item in messages">
              <div class="guestbook__messagelist__itemheader">
                <div class="guestbook__messagelist__itemavatar"><i class="fas fa-user"></i></div>
                <div class="guestbook__messagelist__iteminfo">
                  <div class="guestbook__messagelist__itemname">{{ item.name }}</div>
                  <div class="guestbook__messagelist__itememail">{{ item.email }}</div>
                </div>
              </div>
              <div class="guestbook__messagelist__itemtext">
                {{item.text}}
              </div>
            </div>
          </div>
          <modal name="successAdd" classes="template-popup-action" :min-height="1" width="400" height="auto" :adaptive="true">
            Ваше сообщение успешно добавлено!
            <a href="" class="btn-close" @click.prevent="$modal.hide('successAdd')">Закрыть</a>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { GET_GUESTBOOK, ADD_GUESTBOOK } from '../store/actions.type'

  export default {
    name: 'GuestBook',
    data() {
      return {
        name: '',
        email: '',
        text: '',
        messages: [],
        error_name: { status: false, msg: ''},
        error_email: { status: false, msg: ''},
        error_text: { status: false, msg: ''},
        page: 1,
        total: 0,
        load: true
      }
    },
    computed: {
      ...mapGetters([
        'get_messages',
        'get_total'
      ])
    },
    watch: {
      get_total(val) {
        this.total = val
      },
      get_messages(val) {
        this.load = false
        this.messages = val
      }
    },
    mounted() {    
      this.getMessages()
      var self = this
      window.onscroll = function() {self.scrollGuestBook()}
    },
    methods: {
      addMessage() {
        var error = false
        this.clearError()
        if(this.name.trim().length < 3) {
          this.error_name = {
            status: true,
            msg: 'Введите имя'
          }
          error = true
        }
        if(!this.validateEmail(this.email)) {
          this.error_email = {
            status: true,
            msg: 'Не верный формат Email'
          }
          error = true
        }
        if(this.text.trim().length < 10) {
          this.error_text = {
            status: true,
            msg: 'Поле сообщение должно содержать минимум 10 символов'
          }
          error = true
        }
        if(!error) {
          var args = {
            name: this.name,
            email: this.email,
            text: this.text
          }
          this.$store
            .dispatch(ADD_GUESTBOOK, args)
            .then(() => {
              this.$modal.show('successAdd')
            })
          this.name = ''
          this.email = ''
          this.text = ''
        }
      },
      scrollGuestBook () {
        var top = document.documentElement.scrollTop;
        var el = document.querySelector(".guestbook__messagelist")
        if(top + window.innerHeight >= el.offsetTop + el.offsetHeight && !this.load && this.total != 0 && this.total > this.messages.length) {
          this.load = true
          this.getMessages()
        }
      },
      enterField (e, field) {
        this[field].status = false
      },
      clearError() {
        this.error_name = { status: false, msg: ''}
        this.error_email = { status: false, msg: ''}
        this.error_text = { status: false, msg: ''}
      },
      getMessages() {
        this.$store.dispatch(GET_GUESTBOOK, this.page)
        this.page++;
      },
      validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    }
  }
</script>
