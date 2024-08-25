(()=>{"use strict";const e=(e,t,o,r,n)=>{const a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__delete-button"),c=a.querySelector(".card__like-button"),s=a.querySelector(".card__image"),u=a.querySelector(".card__like-counter");return a.querySelector(".card__title").textContent=e.name,u.textContent=e.likes.length,s.src=e.link,s.alt=`на изображении ${e.name}`,s.addEventListener("click",(()=>r(e))),c.addEventListener("click",(()=>o(e._id,c,u))),e.likes.some((e=>e._id===n))&&c.classList.add("card__like-button_is-active"),e.owner._id!==n?i.remove():i.addEventListener("click",(()=>{t(e._id),a.remove()})),a};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keyup",r)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keyup",r)}function r(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}const n=(e,t,o)=>{const r=t.querySelector(`.${o.id}-error`);o.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""},a=(e,t,o)=>{(e=>e.some((e=>!e.validity.valid)))(t)?c(o,e):(o.disabled=!1,o.classList.remove(e.inactiveButtonClass))},i=(e,t)=>{Array.from(t.querySelectorAll(e.inputSelector)).forEach((o=>{n(e,t,o)})),c(t.querySelector(e.submitButtonSelector),e)},c=(e,t)=>{e.disable,e.classList.add(t.inactiveButtonClass)},s="1fcbb7db-2196-4d12-a10f-03fef2f41234",u="wff-cohort-20",l=e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`),p=e=>fetch(`https://nomoreparties.co/v1/${u}/cards/${e}`,{method:"DELETE",headers:{authorization:s,"Content-Type":"application/json"}}).then((e=>l(e))),d=document.querySelector(".places__list"),_=document.querySelector(".profile__image"),m=document.querySelector(".popup_type_avatar"),y=document.querySelector("form[name='edit-avatar']"),v=y.querySelector(".popup__input_type_url"),h=document.querySelector(".profile__edit-button"),f=document.querySelector(".popup_type_edit"),S=document.querySelector("form[name='edit-profile']"),q=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),L=S.querySelector(".popup__input_type_name"),E=S.querySelector(".popup__input_type_description"),k=document.querySelector(".profile__add-button"),g=document.querySelector(".popup_type_new-card"),x=document.querySelector("form[name='new-place']"),$=x.querySelector(".popup__input_type_card-name"),T=x.querySelector(".popup__input_type_url"),A=document.querySelector(".popup_type_image"),j=A.querySelector(".popup__image"),z=A.querySelector(".popup__caption"),B=document.querySelectorAll(".popup");let D;const P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},w=(e,t,o)=>{q.textContent=e,b.textContent=t,C.style=`background-image: url(${o})`},N=e=>{j.src=e.link,j.alt=e.name,z.textContent=e.name,t(A)};function O(e,t,o){t.classList.contains("card__like-button_is-active")?(e=>fetch(`https://nomoreparties.co/v1/${u}/cards/likes/${e}`,{method:"DELETE",headers:{authorization:s,"Content-Type":"application/json"}}).then((e=>l(e))))(e).then((e=>{o.textContent=e.likes.length,t.classList.remove("card__like-button_is-active")})):(e=>fetch(`https://nomoreparties.co/v1/${u}/cards/likes/${e}`,{method:"PUT",headers:{authorization:s,"Content-Type":"application/json"}}).then((e=>l(e))))(e).then((e=>{o.textContent=e.likes.length,t.classList.add("card__like-button_is-active")}))}Promise.all([fetch(`https://nomoreparties.co/v1/${u}/users/me`,{headers:{authorization:s}}).then((e=>l(e))),fetch(`https://nomoreparties.co/v1/${u}/cards`,{headers:{authorization:s}}).then((e=>l(e)))]).then((([t,o])=>{D=t._id,w(t.name,t.about,t.avatar),o.forEach((function(t){d.append(e(t,p,O,N,D))}))})).catch((e=>console.log(e))),h.addEventListener("click",(e=>{i(P,f),L.value=q.textContent,E.value=b.textContent,t(f)})),k.addEventListener("click",(e=>{i(P,g),$.value="",T.value="",t(g)})),_.addEventListener("click",(e=>{i(P,m),v.value="",t(m)})),B.forEach((e=>{e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(()=>{o(e)})),e.addEventListener("mousedown",(t=>{t.target.classList.contains("popup")&&o(e)}))})),S.addEventListener("submit",(function(e){var t,r;e.preventDefault(),e.target.querySelector(".popup__button").textContent="Сохранение...",(t=L.value,r=E.value,fetch(`https://nomoreparties.co/v1/${u}/users/me`,{method:"PATCH",headers:{authorization:s,"Content-Type":"application/json"},body:JSON.stringify({name:t,about:r})}).then((e=>l(e)))).then((e=>{w(e.name,e.about,e.avatar)})).catch((e=>{console.log(e)})).finally((()=>{e.target.querySelector(".popup__button").textContent="Сохранить"})),o(f)})),x.addEventListener("submit",(function(t){t.preventDefault(),t.target.querySelector(".popup__button").textContent="Сохранение...";const r={name:$.value,link:T.value};var n,a;(n=r.name,a=r.link,fetch(`https://nomoreparties.co/v1/${u}/cards`,{method:"POST",headers:{authorization:s,"Content-Type":"application/json"},body:JSON.stringify({name:n,link:a})}).then((e=>l(e)))).then((t=>{d.prepend(e(t,p,O,N,D))})).catch((e=>{console.log(e)})).finally((()=>{t.target.querySelector(".popup__button").textContent="Сохранить"})),x.reset(),o(g)})),y.addEventListener("submit",(function(e){var t;e.preventDefault(),e.target.querySelector(".popup__button").textContent="Сохранение...",(t=v.value,fetch(`https://nomoreparties.co/v1/${u}/users/me/avatar`,{method:"PATCH",headers:{authorization:s,"Content-Type":"application/json"},body:JSON.stringify({avatar:t})}).then((e=>l(e)))).then((e=>{console.log(e),w(e.name,e.about,e.avatar)})).catch((e=>{console.log(e)})).finally((()=>{e.target.querySelector(".popup__button").textContent="Сохранить"})),y.reset(),o(m)})),(e=>{Array.from(document.querySelectorAll(e.formSelector)).forEach((t=>{t.addEventListener("submit",(function(e){e.preventDefault()})),((e,t)=>{const o=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);a(e,o,r),o.forEach((i=>{i.addEventListener("input",(function(){((e,t,o)=>{o.validity.patternMismatch?o.setCustomValidity(o.dataset.errorMessage):o.setCustomValidity(""),o.validity.valid?n(e,t,o):((e,t,o,r)=>{const n=t.querySelector(`.${o.id}-error`);o.classList.add(e.inputErrorClass),n.textContent=r,n.classList.add(e.errorClass)})(e,t,o,o.validationMessage)})(e,t,i),a(e,o,r)}))}))})(e,t)}))})(P)})();