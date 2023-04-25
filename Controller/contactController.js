const asynchandler = require("express-async-handler")
const Contact = require("../models/contactModel")

// @desp get all contact
// @ route GET /api/contacts
// @access private

const getContacts = asynchandler(async (req, resp) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    resp.status(200).json(contacts)
})

// @desp create all contact
// @ route POST /api/contacts
// @access private

const createContact = asynchandler(async (req, resp) => {
    // console.log("the request body is: ", req.body)
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        resp.status(404)
        throw new Error("All fields are madatory")
    }
    const contacts = new Contact({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    console.log(contacts)
    contacts.save()
    resp.status(200).send(contacts)
})


// @desp get  contact
// @ route GET /api/contacts/:id
// @access private

const getContact = asynchandler(async (req, resp) => {
    //   if you have a route as /api/:name, then the "name" property is available as req.params.name.
    const contact1 = await Contact.findById(req.params.id);
    console.log(contact1)
    if (!contact1) {
        resp.status(404).json("Contact Not Found")
    }
    resp.status(200).json(contact1)
})




// @desp update contact
// @ route put /api/contacts/:id
// @access private
const updateContact = asynchandler(async (req, resp) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        resp.status(404).send("Contact not found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        resp.status(403)
        throw new Error("User dodnt have permission to update")
    }

    console.log(contact)
    const updateid = await Contact.findByIdAndUpdate(
        contact,
        req.body,
        { new: true }
    )
    resp.status(200).json(updateid)
})



// @desp delete contact
// @ route delete /api/contacts/:id
// @access private
const deleteContact = asynchandler(async (req, resp) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        resp.status(404).json("Contact Not Found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        resp.status(403)
        throw new Error("User dodnt have permission to update")
    }
    const deleterecord = await Contact.deleteOne({ _id: req.params.id })
    resp.status(200).json(deleterecord)
})


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }